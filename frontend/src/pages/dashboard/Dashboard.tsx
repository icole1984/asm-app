import { useEffect, useMemo, useState } from "react";
import {
  MapPin,
  Activity,
  Users,
  CheckCircle,
  FileText,
  Clock,
  AlertCircle,
  Plus,
  Calendar,
  Download,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts";

type SiteStatus = "PLANNING" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | string;

type Site = {
  id: string;
  name: string;
  location: string;
  address: string;
  postcode: string;
  startDate: string;
  endDate?: string | null;
  status: SiteStatus;
  createdAt?: string;
  updatedAt?: string;
};

type OperationStatus = "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "ON_HOLD" | "CANCELLED" | string;

type SiteOperation = {
  id: string;
  siteId: string;
  operationType: string;
  description: string;
  startTime: string;
  endTime?: string | null;
  duration?: number | null;
  workersCount: number;
  status: OperationStatus;
  createdAt?: string;
  updatedAt?: string;
};

type Document = {
  id: string;
  siteId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  docType: string;
  createdAt: string;
};

type Checklist = {
  id: string;
  siteId: string;
  name: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

const API_BASE = "http://localhost:5000";

function toDayKey(d: Date) {
  // UK style day label
  return d.toLocaleDateString("en-GB", { weekday: "short" }); // Mon, Tue...
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function Dashboard() {
  const [sites, setSites] = useState<Site[]>([]);
  const [ops, setOps] = useState<SiteOperation[]>([]);
  const [docs, setDocs] = useState<Document[]>([]);
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErr(null);

      try {
        const [sitesRes, opsRes, docsRes, chkRes] = await Promise.all([
          fetch(`${API_BASE}/api/sites`),
          fetch(`${API_BASE}/api/operations`),
          fetch(`${API_BASE}/api/documents`),
          fetch(`${API_BASE}/api/checklists`),
        ]);

        if (!sitesRes.ok) throw new Error(`Sites API error (${sitesRes.status})`);
        if (!opsRes.ok) throw new Error(`Operations API error (${opsRes.status})`);
        if (!docsRes.ok) throw new Error(`Documents API error (${docsRes.status})`);
        if (!chkRes.ok) throw new Error(`Checklists API error (${chkRes.status})`);

        const [sitesJson, opsJson, docsJson, chkJson] = await Promise.all([
          sitesRes.json(),
          opsRes.json(),
          docsRes.json(),
          chkRes.json(),
        ]);

        if (!cancelled) {
          setSites(Array.isArray(sitesJson) ? sitesJson : []);
          setOps(Array.isArray(opsJson) ? opsJson : []);
          setDocs(Array.isArray(docsJson) ? docsJson : []);
          setChecklists(Array.isArray(chkJson) ? chkJson : []);
        }
      } catch (e: any) {
        if (!cancelled) setErr(e?.message ?? "Failed to load dashboard data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const computed = useMemo(() => {
    const now = new Date();

    // Sites
    const activeSites = sites.filter((s) => String(s.status).toUpperCase() === "ACTIVE");
    const planningSites = sites.filter((s) => String(s.status).toUpperCase() === "PLANNING");
    const pausedSites = sites.filter((s) => String(s.status).toUpperCase() === "PAUSED");
    const completedSites = sites.filter((s) => String(s.status).toUpperCase() === "COMPLETED");

    // Operations today + completed today
    const opsToday = ops.filter((o) => isSameDay(new Date(o.startTime), now));
    const completedToday = ops.filter(
      (o) => String(o.status).toUpperCase() === "COMPLETED" && o.endTime && isSameDay(new Date(o.endTime), now)
    );

    // Active workers (rough: sum of workers on IN_PROGRESS ops)
    const activeWorkers = ops
      .filter((o) => String(o.status).toUpperCase() === "IN_PROGRESS")
      .reduce((sum, o) => sum + (o.workersCount || 0), 0);

    // Pending documents (you can define "pending" later; for now: total docs)
    const pendingDocuments = docs.length;

    // Safety alerts (placeholder: show 0 until you add real alerts model)
    const safetyAlerts = 0;

    // Weekly operations chart (last 7 days including today)
    const days: Date[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      days.push(d);
    }

    const weeklyOps = days.map((d) => {
      const label = toDayKey(d);
      const total = ops.filter((o) => isSameDay(new Date(o.startTime), d)).length;
      const completed = ops.filter(
        (o) => String(o.status).toUpperCase() === "COMPLETED" && o.endTime && isSameDay(new Date(o.endTime), d)
      ).length;
      return { name: label, operations: total, completed };
    });

    // Site status pie
    const siteStatusData = [
      { name: "Active", value: activeSites.length, color: "#10b981" },
      { name: "Planning", value: planningSites.length, color: "#f59e0b" },
      { name: "Paused", value: pausedSites.length, color: "#ef4444" },
      { name: "Completed", value: completedSites.length, color: "#6b7280" },
    ].filter((x) => x.value > 0 || sites.length === 0);

    // Operation types (top 6)
    const typeMap = new Map<string, number>();
    ops.forEach((o) => {
      const key = o.operationType || "Unknown";
      typeMap.set(key, (typeMap.get(key) || 0) + 1);
    });
    const operationTypesData = Array.from(typeMap.entries())
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    // Monthly trend – quick approximation based on last 4 weeks
    const weeklyTrendData = (() => {
      const weeks: { week: string; sites: number; operations: number }[] = [];
      for (let w = 3; w >= 0; w--) {
        const end = new Date(now);
        end.setDate(now.getDate() - w * 7);
        const start = new Date(end);
        start.setDate(end.getDate() - 6);

        const opsInWeek = ops.filter((o) => {
          const t = new Date(o.startTime).getTime();
          return t >= start.getTime() && t <= end.getTime();
        }).length;

        // “sites” metric here: active sites count (current) — you can improve later with site history
        weeks.push({
          week: `Week ${4 - w}`,
          sites: activeSites.length,
          operations: opsInWeek,
        });
      }
      return weeks;
    })();

    // Recent activity from live data (last few records)
    const recentActivities = [
      ...sites
        .slice()
        .sort((a, b) => (new Date(b.createdAt ?? b.startDate).getTime() - new Date(a.createdAt ?? a.startDate).getTime()))
        .slice(0, 2)
        .map((s) => ({
          id: `site-${s.id}`,
          title: "Site added",
          description: `${s.name} - ${s.location}`,
          time: new Date(s.createdAt ?? s.startDate).toLocaleString("en-GB"),
          icon: MapPin,
          color: "primary",
        })),
      ...ops
        .slice()
        .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
        .slice(0, 2)
        .map((o) => ({
          id: `op-${o.id}`,
          title: String(o.status).toUpperCase() === "COMPLETED" ? "Operation completed" : "Operation logged",
          description: `${o.operationType} - ${o.description}`,
          time: new Date(o.startTime).toLocaleString("en-GB"),
          icon: String(o.status).toUpperCase() === "COMPLETED" ? CheckCircle : Activity,
          color: String(o.status).toUpperCase() === "COMPLETED" ? "success" : "info",
        })),
      ...docs
        .slice()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 1)
        .map((d) => ({
          id: `doc-${d.id}`,
          title: "Document uploaded",
          description: d.fileName,
          time: new Date(d.createdAt).toLocaleString("en-GB"),
          icon: FileText,
          color: "info",
        })),
    ].slice(0, 5);

    // Upcoming sites – next 4 by startDate
    const upcomingSites = sites
      .slice()
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .filter((s) => new Date(s.startDate).getTime() >= new Date(now.toDateString()).getTime())
      .slice(0, 4)
      .map((s) => ({
        name: s.name,
        location: s.location,
        date: s.startDate,
        status: String(s.status).toUpperCase() === "ACTIVE" ? "Active" : "Planning",
      }));

    return {
      activeSites: activeSites.length,
      opsToday: opsToday.length,
      activeWorkers,
      completedToday: completedToday.length,
      pendingDocuments,
      safetyAlerts,
      weeklyOps,
      siteStatusData,
      operationTypesData,
      weeklyTrendData,
      recentActivities,
      upcomingSites,
    };
  }, [sites, ops, docs, checklists]);

  const stats = [
    {
      title: "Active Sites",
      value: String(computed.activeSites),
      change: "",
      trend: "up",
      icon: MapPin,
      color: "primary",
    },
    {
      title: "Today's Operations",
      value: String(computed.opsToday),
      change: "",
      trend: "up",
      icon: Activity,
      color: "success",
    },
    {
      title: "Active Workers",
      value: String(computed.activeWorkers),
      change: "",
      trend: "up",
      icon: Users,
      color: "info",
    },
    {
      title: "Completed Today",
      value: String(computed.completedToday),
      change: "",
      trend: "up",
      icon: CheckCircle,
      color: "success",
    },
    {
      title: "Documents",
      value: String(computed.pendingDocuments),
      change: "",
      trend: "up",
      icon: FileText,
      color: "warning",
    },
    {
      title: "Safety Alerts",
      value: String(computed.safetyAlerts),
      change: "",
      trend: computed.safetyAlerts > 0 ? "up" : "down",
      icon: AlertCircle,
      color: computed.safetyAlerts > 0 ? "danger" : "success",
    },
  ];

  if (loading) {
    return <div className="card" style={{ padding: "1rem" }}>Loading dashboard…</div>;
  }

  if (err) {
    return (
      <div className="card" style={{ padding: "1rem" }}>
        <h3 style={{ marginBottom: 8 }}>Dashboard data failed to load</h3>
        <p style={{ marginBottom: 0, color: "#b42318" }}>{err}</p>
        <p style={{ marginTop: 8, fontSize: 12, color: "#667085" }}>
          Check backend is running on {API_BASE} and endpoints return JSON.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className={`stat-icon ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
                {stat.change ? (
                  <span className={`trend ${stat.trend}`}>{stat.change} from last week</span>
                ) : (
                  <span className="trend" style={{ opacity: 0.7 }}>
                    Live
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <a href="/sites" className="action-card">
          <Plus size={48} />
          <h4>New Site</h4>
          <p>Register a new asbestos site</p>
        </a>
        <a href="/operations" className="action-card">
          <Activity size={48} />
          <h4>Log Operation</h4>
          <p>Record site activities</p>
        </a>
        <a href="/documents" className="action-card">
          <FileText size={48} />
          <h4>Upload Document</h4>
          <p>Add certificates & reports</p>
        </a>
        <a href="/checklists" className="action-card">
          <CheckCircle size={48} />
          <h4>Safety Check</h4>
          <p>Complete safety checklist</p>
        </a>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Operations Chart */}
        <div className="card">
          <div className="card-header">
            <h3>Weekly Operations</h3>
            <div className="card-actions">
              <button className="btn btn-secondary btn-sm">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={computed.weeklyOps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="operations" fill="#2563eb" name="Total Operations" />
              <Bar dataKey="completed" fill="#10b981" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Site Status Chart */}
        <div className="card">
          <div className="card-header">
            <h3>Site Status Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={computed.siteStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                dataKey="value"
              >
                {computed.siteStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={(entry as any).color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Operation Types */}
        <div className="card">
          <div className="card-header">
            <h3>Operation Types</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={computed.operationTypesData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" allowDecimals={false} />
              <YAxis dataKey="type" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Trend */}
        <div className="card">
          <div className="card-header">
            <h3>Monthly Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={computed.weeklyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="sites" stackId="1" stroke="#2563eb" fill="#2563eb" name="Active Sites" />
              <Area type="monotone" dataKey="operations" stackId="2" stroke="#10b981" fill="#10b981" name="Operations" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity and Upcoming Sites */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "1.5rem" }}>
        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <h3>Recent Activity</h3>
            <button className="btn btn-secondary btn-sm">View All</button>
          </div>
          <ul className="activity-list">
            {computed.recentActivities.length === 0 ? (
              <li className="activity-item">
                <div className="activity-content">
                  <h4>No activity yet</h4>
                  <p>Seeded data will appear here as you create sites, ops and uploads.</p>
                </div>
              </li>
            ) : (
              computed.recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <li key={activity.id} className="activity-item">
                    <div className={`activity-icon stat-icon ${activity.color}`}>
                      <Icon size={20} />
                    </div>
                    <div className="activity-content">
                      <h4>{activity.title}</h4>
                      <p>{activity.description}</p>
                      <div className="activity-time">
                        <Clock size={12} style={{ display: "inline", marginRight: "0.25rem" }} />
                        {activity.time}
                      </div>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>

        {/* Upcoming Sites */}
        <div className="card">
          <div className="card-header">
            <h3>Upcoming Sites</h3>
            <button className="btn btn-secondary btn-sm">
              <Calendar size={16} />
              Calendar
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Site Name</th>
                <th>Location</th>
                <th>Start Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {computed.upcomingSites.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: "1rem", opacity: 0.8 }}>
                    No upcoming sites found (based on start date).
                  </td>
                </tr>
              ) : (
                computed.upcomingSites.map((site, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: 600 }}>{site.name}</td>
                    <td>{site.location}</td>
                    <td>{new Date(site.date).toLocaleDateString("en-GB")}</td>
                    <td>
                      <span className={`badge badge-${site.status === "Active" ? "success" : "warning"}`}>
                        {site.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
            Live: sites={sites.length} ops={ops.length} docs={docs.length} checklists={checklists.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
