import type { Schema, Attribute } from "@strapi/strapi"

export interface SharedEmbeddedMedia extends Schema.Component {
  collectionName: "components_shared_embedded_medias"
  info: {
    displayName: "Embedded Media"
    description: ""
  }
  attributes: {
    media: Attribute.Text & Attribute.Required
  }
}

export interface SharedLocation extends Schema.Component {
  collectionName: "components_shared_locations"
  info: {
    displayName: "Location"
    icon: "location-arrow"
    description: ""
  }
  attributes: {
    longitude: Attribute.Float & Attribute.Required
    latitude: Attribute.Float & Attribute.Required
    altitude: Attribute.Float
  }
}

export interface SharedMediaGallery extends Schema.Component {
  collectionName: "components_shared_media_gallery"
  info: {
    displayName: "Media Gallery"
    description: ""
  }
  attributes: {
    files: Attribute.Media
  }
}

export interface SharedMedia extends Schema.Component {
  collectionName: "components_shared_media"
  info: {
    displayName: "Media"
    icon: "photo-video"
    description: ""
  }
  attributes: {
    file: Attribute.Media & Attribute.Required
  }
}

export interface SharedRichText extends Schema.Component {
  collectionName: "components_shared_rich_texts"
  info: {
    displayName: "Rich Text"
    icon: "align-justify"
  }
  attributes: {
    body: Attribute.RichText & Attribute.Required
  }
}

export interface SharedSeo extends Schema.Component {
  collectionName: "components_meta_seos"
  info: {
    displayName: "Seo"
    icon: "address-card"
    description: ""
  }
  attributes: {
    metaTitle: Attribute.String
    metaDescription: Attribute.Text
    shareImage: Attribute.Media
    article: Attribute.Boolean & Attribute.DefaultTo<true>
  }
}

export interface SocialMediaSocialMediaAccount extends Schema.Component {
  collectionName: "components_global_social_media_accounts"
  info: {
    displayName: "Social Media Account"
    icon: "globe"
    description: ""
  }
  attributes: {
    username: Attribute.String
    url: Attribute.String
    platform: Attribute.Enumeration<["facebook", "twitter", "instagram", "youtube", "rss", "komoot"]>
  }
}

declare module "@strapi/types" {
  export module Shared {
    export interface Components {
      "shared.embedded-media": SharedEmbeddedMedia
      "shared.location": SharedLocation
      "shared.media-gallery": SharedMediaGallery
      "shared.media": SharedMedia
      "shared.rich-text": SharedRichText
      "shared.seo": SharedSeo
      "social-media.social-media-account": SocialMediaSocialMediaAccount
    }
  }
}
