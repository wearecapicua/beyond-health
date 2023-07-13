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
