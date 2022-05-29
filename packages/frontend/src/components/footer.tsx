import "twin.macro"
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { StrapiSocialMedia, useGlobal } from "../hooks/use-global"
import { useCallback } from "react"

const Footer = () => {
  const { socialMedia } = useGlobal()

  return (
    <footer tw="bg-gray-700 text-gray-100">
      <div tw="md:container px-responsive py-4">
        <div tw="flex justify-between flex-wrap-reverse gap-y-2">
          <a href="/imprint">Impressum</a>
          <div tw="text-2xl">
            {socialMedia.map(item => (
              <SocialMediaLink socialMedia={item} />
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
      tw="flex items-center space-x-2"
    >
      <FontAwesomeIcon icon={getIcon()} />
      <span tw="sr-only">{getTitle()}</span>
      <span tw="text-base text-gray-300">{socialMedia.username}</span>
    </a>
  )
}

export default Footer
