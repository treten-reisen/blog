// import "twin.macro"
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCallback } from "react"

import type { StrapiSocialMedia } from "../data/schema/social-media.schema"

export type FooterProps = {
  socialMedia: StrapiSocialMedia[]
}

const Footer = ({ socialMedia }: FooterProps) => {
  return (
    <footer className="bg-gray-700 text-gray-100">
      <div className="md:container px-responsive py-4">
        <div className="flex justify-between flex-wrap-reverse gap-y-2">
          <a href="/imprint">Impressum</a>
          <div className="text-2xl">
            {socialMedia.map(item => (
              <SocialMediaLink key={item.id} socialMedia={item} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

type SocialMediaLinkProps = {
  socialMedia: StrapiSocialMedia
}

const SocialMediaLink = ({ socialMedia }: SocialMediaLinkProps) => {
  const getTitle = useCallback(() => {
    switch (socialMedia.platform) {
      case "facebook":
        return "Facebook"
      case "instagram":
        return "Instagram"
      case "twitter":
        return "Twtter"
      case "youtube":
        return "YouTube"
    }
  }, [socialMedia])

  const getIcon = useCallback(() => {
    switch (socialMedia.platform) {
      case "facebook":
        return brands("facebook")
      case "instagram":
        return brands("instagram")
      case "twitter":
        return brands("twitter")
      case "youtube":
        return brands("youtube")
    }
  }, [socialMedia])

  return (
    <a
      href={socialMedia.url}
      title={getTitle()}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2"
    >
      <FontAwesomeIcon icon={getIcon()} />
      <span className="sr-only">{getTitle()}</span>
      <span className="text-base text-gray-300">{socialMedia.username}</span>
    </a>
  )
}

export default Footer
