export interface VlsLawPractice {
    id: number;
    name: string;
    mobile: string;
    email: string;
    amount: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    payment_status: string;
    captured: number;
    created_at: string;
    updated_at: string;
}

