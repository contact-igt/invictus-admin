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

export interface VlsAibe {
    id: number;
    name: string;
    mobile: string;
    email: string;
    amount: string;
    registered_date: string;
    programm_start_date: string;
    programm_end_date: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    payment_status: string;
    captured: number;
    ip_address: string,
    utm_source: string,
    created_at: string;
    updated_at: string;
}