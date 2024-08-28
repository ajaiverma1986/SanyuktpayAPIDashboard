export class BaseResponse {
    public HasError!: boolean;
    public Errors!: ErrorResponse[];
    public CreatedBy!: string;
    public CreatedOn!: Date;
    public ModifiedBy!: string;
    public ModifiedOn!: Date;

    public GetErrorMessage(): string {
        if (this.Errors != null && this.Errors.length > 0)
            return this.Errors[0].ErrorMessage;
        else
            return "";
    }
}
export class ErrorResponse {

    public ErrorCode!: number;
    public ErrorMessage!: string;
    public HasError!: boolean;
}
export class ListResponse extends BaseResponse {
    public TotalRecords: number = 0;
    public CurrentPage: number = 1;
    public Result!: any;
    public Headers!: string[];
}

