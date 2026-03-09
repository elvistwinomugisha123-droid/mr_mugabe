export interface Bundle {
  id: string;
  name: string;
  price_ugx: number;
  validity: string;
  notes: string;
  active: boolean;
}

export interface Subcategory {
  id: string;
  name: string;
  bundles: Bundle[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  subcategories: Subcategory[];
}

export interface PaymentInfo {
  number: string;
  name: string;
  merchant_code: string;
  merchant_name?: string;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  location: string;
  whatsapp: string;
  phone2: string;
  payment: {
    mtn: PaymentInfo;
    airtel: PaymentInfo;
  };
}

export interface ServicesData {
  business: BusinessInfo;
  categories: Category[];
}

export interface OrderPayload {
  customer_name: string;
  customer_phone: string;
  service_category: string;
  bundle_name: string;
  price: string;
  payment_method: string;
  screenshot_url: string;
  timestamp: string;
}
