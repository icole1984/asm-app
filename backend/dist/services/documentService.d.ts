declare class DocumentService {
    private s3;
    constructor();
    uploadDocument(fileName: string, fileContent: Buffer): Promise<string>;
    deleteDocument(fileUrl: string): Promise<void>;
    getSignedUrl(fileName: string): Promise<string>;
}
declare const _default: DocumentService;
export default _default;
//# sourceMappingURL=documentService.d.ts.map