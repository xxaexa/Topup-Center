import { ReactNode } from "react";

// Component
export interface BoxWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export interface ButtonProps {
    text: string;
    onClick?: () => void;
    type: "submit" | "reset" | "button";
    className?: string;
    icon?: ReactNode;
  }

  export interface GameCardProps {
    image: string;
    name: string;
    link: string;
  }
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    type?: string;
  }

  export interface ClickProps {
    onClick?: () => void;
  }

  export interface TableProps {
    headers: string[];
    data: React.ReactNode[][];
  }

// Page
export interface Variant {
    name: string;
    price: number;
}
  
export  interface InputField {
    field_name: string;
    label: string;
    required: boolean;
}
  
  export interface CreateVoucherRequest {
    _id?:string;
    game_name: string;
    voucher_name: string;
    image_url: string;
    description: string;
    input_fields: InputField[];
    variants: Variant[];
  }

  export interface UpdateVoucherRequest {
    id:string;
    game_name: string;
    voucher_name: string;
    image_url: string;
    description: string;
    input_fields: InputField[];
    variants: Variant[];
  }
  
  export const INPUT_TYPE_PRESETS: Record<string, InputField[]> = {
    id: [{ field_name: "user_id", label: "User ID", required: true }],
    id_server: [
      { field_name: "user_id", label: "User ID", required: true },
      { field_name: "server", label: "Server", required: true },
    ],
  };

  export interface VoucherProps {
    _id: string;
    game_name: string;
    voucher_name: string;
    image_url: string;
    description: string;
    input_fields: InputField[];
    variants: Variant[];
    createdAt: string;
    updatedAt: string;
  }


// Response
export interface VoucherResponse {
    status: string;
    data: VoucherProps[];
  };
export  interface ILoginProps {
    email: string;
    password: string;
};

export  interface IRegisterProps {
  name:string;
  email: string;
  password: string;
};

export  interface IUserResponse{
  name:string;
  email: string;
  password: string;
}
  
export interface Variant {
  name: string;
  price: number;
}

export interface BuyerInputs {
  [key: string]: string;
}

export interface TransactionProps {
  _id: string;
  buyer_name: string;
  buyer_email: string;
  voucher_id: string;
  voucher_name: string;
  buyer_inputs: BuyerInputs;
  payment_status: string;
  delivery_status: string;
  variant: Variant;
  transaction_id: string;
  createdAt: string;
  updatedAt: string;
  payment_method:string;
}

export interface TransactionResponse {
  status: string;
  data: TransactionProps[];
}
export interface TransactionResponseList{
  status: string;
  data: TransactionProps;
}
export interface CreateTransactionRequest{
  buyer_email: string,
  voucher_id: string,
  voucher_name: string,
  variant: Variant | null | undefined,
  buyer_inputs:  BuyerInputs,
}

export interface UpdateTransactionRequest{
  id?:string,
  _id?: string,
  delivery_status: string,
  buyer_email: string,
}

export interface TransactionData {
  midtransToken :string, 
  transactionId: string
}

export interface CreateTransactionResponse {  
  data : TransactionData
}

export interface User  {
  email: string;
  name : string;
}  

export interface UserData {
    accessToken: string;
    message: string;
    user: User
  }