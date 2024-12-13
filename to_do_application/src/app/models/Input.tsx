interface InputInterface {
    name?: string;
    id: string;
    type: string;
    value?: any;
    placeholder: string;
    required: boolean;
    multiline?: boolean;
    rows?: number;  
}
export type {InputInterface};