import { DocumentBuilder } from "@nestjs/swagger";
import { ExternalDocumentationObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

type Tag = {
  name: string;
  description?: string | undefined;
  externalDocs?: ExternalDocumentationObject | undefined;
};

const app = {
  name: "School API",
  description: "Listagem de Endpoints",
  version: "1.0",
  // tags: [],
  tags: [
    { name: "users" },
    { name: "resources" },
    { name: "auth" },
    { name: "media" },
  ],
};

export class SwaggerDocumentationAdapter {
  document: any;
  config: any;

  constructor(
    title: string,
    description: string,
    version: string,
    tags: Tag[]
  ) {
    this.document = new DocumentBuilder();
    this.document = this.document
      .setTitle(title)
      .setDescription(description)
      .setVersion(version);

    tags.forEach((tag: Tag) => {
      this.document.addTag(tag.name, tag.description, tag.externalDocs);
    });

    this.config = this.document.build();
  }

  static create() {
    return new SwaggerDocumentationAdapter(
      app.name,
      app.description,
      app.version,
      app.tags
    );
  }

  get() {
    return this.document;
  }

  getConfig() {
    return this.config;
  }
}
