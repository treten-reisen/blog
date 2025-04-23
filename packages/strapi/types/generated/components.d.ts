import type { Schema, Struct } from "@strapi/strapi"

export interface SharedEmbeddedMedia extends Struct.ComponentSchema {
  collectionName: "components_shared_embedded_medias"
  info: {
    description: ""
    displayName: "Embedded Media"
  }
  attributes: {
    media: Schema.Attribute.Text & Schema.Attribute.Required
  }
}

export interface SharedLocation extends Struct.ComponentSchema {
  collectionName: "components_shared_locations"
  info: {
    description: ""
    displayName: "Location"
    icon: "location-arrow"
  }
  attributes: {
    altitude: Schema.Attribute.Float
    latitude: Schema.Attribute.Float & Schema.Attribute.Required
    longitude: Schema.Attribute.Float & Schema.Attribute.Required
  }
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: "components_shared_media"
  info: {
    description: ""
    displayName: "Media"
    icon: "photo-video"
  }
  attributes: {
    file: Schema.Attribute.Media<"images" | "files"> & Schema.Attribute.Required
  }
}

export interface SharedMediaGallery extends Struct.ComponentSchema {
  collectionName: "components_shared_media_gallery"
  info: {
    description: ""
    displayName: "Media Gallery"
  }
  attributes: {
    files: Schema.Attribute.Media<"images", true>
  }
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: "components_shared_rich_texts"
  info: {
    displayName: "Rich Text"
    icon: "align-justify"
  }
  attributes: {
    body: Schema.Attribute.RichText & Schema.Attribute.Required
  }
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: "components_meta_seos"
  info: {
    description: ""
    displayName: "Seo"
    icon: "address-card"
  }
  attributes: {
    article: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>
    metaDescription: Schema.Attribute.Text
    metaTitle: Schema.Attribute.String
    shareImage: Schema.Attribute.Media<"images">
  }
}

export interface SocialMediaSocialMediaAccount extends Struct.ComponentSchema {
  collectionName: "components_global_social_media_accounts"
  info: {
    description: ""
    displayName: "Social Media Account"
    icon: "globe"
  }
  attributes: {
    platform: Schema.Attribute.Enumeration<["facebook", "twitter", "instagram", "youtube", "rss", "komoot"]>
    url: Schema.Attribute.String
    username: Schema.Attribute.String
  }
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "shared.embedded-media": SharedEmbeddedMedia
      "shared.location": SharedLocation
      "shared.media": SharedMedia
      "shared.media-gallery": SharedMediaGallery
      "shared.rich-text": SharedRichText
      "shared.seo": SharedSeo
      "social-media.social-media-account": SocialMediaSocialMediaAccount
    }
  }
}
