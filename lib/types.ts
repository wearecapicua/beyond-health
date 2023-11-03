import {
  FieldState,
  ImageField,
  RelationField,
  TitleField,
} from "@prismicio/types";
import { PostDocument } from "prismic-types";

export type PostDocumentWithAuthor = PostDocument & {
  data: {
    author: AuthorContentRelationshipField;
    title: TitleField
  };
};

export type AuthorContentRelationshipField = RelationField<
  "author",
  string,
  {
    name: TitleField;
    picture: ImageField;
  },
  FieldState
>;

export type StripeProduct = {
  default_price: string;
  metadata: {
    Stage: string;
    Term: string;
    Ingredients: string;
  };
  name: string;
  price: number;
  description: string;
};

export type User = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  birthdate: string;
  notice_hair_loss: string;
  medications: string;
  conditions: string;
  questions?: string;
  stage: string;
  has_insurance: boolean;
  has_health_card: boolean;
  product: {
    name: string;
    price: number;
  };
  phone_number: string;
  country: string;
  shipping_address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postal_code: string;
  };
  billing_address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postal_code: string;
  };
  payments_history: string[];
  photo_id_url: string;
  profile_image_url: string;
  insurance_image_url: string;
  health_card_image_url: string;
  stripe_setup_id: string;
};

