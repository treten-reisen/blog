// import "twin.macro"
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCallback } from "react"

import "./footer.css"
import type { StrapiSocialMedia } from "../data/schema/social-media.schema"

export type FooterProps = {
  socialMedia: StrapiSocialMedia[]
}

const Footer = ({ socialMedia }: FooterProps) => {
  return (
    <footer className="bg-gray-700 text-gray-100">
      <div className="px-responsive py-4 md:container">
        <div className="flex flex-wrap-reverse items-end justify-between gap-y-2">
          <div className="flex flex-col">
            <a href="/articles/impressum">Impressum</a>
            <a href="/articles/datenschutzerklaerung">Datenschutz</a>
          </div>
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

  const Icon = useCallback(() => {
    switch (socialMedia.platform) {
      case "facebook":
        return <FontAwesomeIcon icon={brands("facebook")} />
      case "instagram":
        return <FontAwesomeIcon icon={brands("instagram")} />
      case "twitter":
        return <FontAwesomeIcon icon={brands("twitter")} />
      case "youtube":
        return <FontAwesomeIcon icon={brands("youtube")} />
      case "komoot":
        return <KomootIcon />
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
      <span className="w-6">
        <Icon />
      </span>
      <span className="sr-only">{getTitle()}</span>
      <span className="text-base text-gray-300">{socialMedia.username}</span>
    </a>
  )
}

const KomootIcon = () => (
  <svg width="24px" height="24px" viewBox="10 0 192 192" xmlns="http://www.w3.org/2000/svg" fill="none">
    <path
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="12"
      d="M96 170c40.869 0 74-33.131 74-74 0-40.87-33.131-74-74-74-40.87 0-74 33.13-74 74 0 40.869 33.13 74 74 74Z"
    />
    <path
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="12"
      d="M148 148 96 96l-52 52"
    />
    <path
      fill="currentcolor"
      d="m96 96 4.243-4.243a6.001 6.001 0 0 0-8.486 0L96 96Zm-18.385 18.385-4.242 4.242 4.242 4.243 4.243-4.243-4.243-4.242Zm36.77 0-4.243 4.242 4.243 4.243 4.242-4.243-4.242-4.242ZM76 96c0-11.046 8.954-20 20-20V64c-17.673 0-32 14.327-32 32h12Zm20-20c11.046 0 20 8.954 20 20h12c0-17.673-14.327-32-32-32v12Zm-14.142 34.142A19.918 19.918 0 0 1 76 96H64c0 8.835 3.588 16.843 9.373 22.627l8.485-8.485Zm0 8.485 18.385-18.384-8.486-8.486-18.384 18.385 8.485 8.485ZM116 96a19.917 19.917 0 0 1-5.858 14.142l8.485 8.485C124.412 112.843 128 104.835 128 96h-12Zm-24.243 4.243 18.385 18.384 8.485-8.485-18.384-18.385-8.486 8.486Z"
    />
  </svg>
)

export default Footer
