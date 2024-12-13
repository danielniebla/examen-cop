interface  ButtonInterface {
    text: string;
    onClick?: any;
    disabled?: boolean;
    size?: "small" | "medium" | "large";
    type?: "button" | "submit" | "reset";
}
export type { ButtonInterface };