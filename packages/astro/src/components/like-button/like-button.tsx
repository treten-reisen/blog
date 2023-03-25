import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classnames from "classnames"
import { useState } from "react"

import { LikeButtonExplosion } from "./explosion"
import useLike from "./use-like"
import { useTransitionClass } from "./use-transition-class"

import "./like-button.css"

export type LikeButtonProps = {
  articleId: number
}

export const LikeButton = ({ articleId }: LikeButtonProps) => {
  const [explode, setExplode] = useState(false)
  const { data, error, performLike, initialFetchState } = useLike(articleId)

  const {
    className: likeAnimationClassName,
    start: startLikeAnimation,
    end: endLikeAnimation,
  } = useTransitionClass("animation", {
    onExit: () => {
      requestAnimationFrame(() => {
        setExplode(true)
        requestAnimationFrame(() => {
          setExplode(false)
        })
      })
    },
  })

  const handleClick = () => {
    startLikeAnimation()
    performLike()
  }

  return error || initialFetchState === "pending" ? (
    <></>
  ) : (
    <button onClick={handleClick} className="like-button flex flex-col items-center">
      <div className="like-button__icon-wrapper relative">
        <LikeButtonExplosion explode={explode} onExplosionFinished={() => setExplode(false)} />
        <div
          onAnimationEnd={endLikeAnimation}
          onTransitionEnd={endLikeAnimation}
          className={classnames(["like-button__icon", likeAnimationClassName])}
        >
          <span className={classnames(["like-button__icon-regular text-2xl"])}>
            <FontAwesomeIcon icon={regular("heart")} />
          </span>
          <span className={classnames(["like-button__icon-solid text-2xl"])}>
            <FontAwesomeIcon icon={solid("heart")} />
          </span>
        </div>
      </div>
      <span>{data?.likes}</span>
    </button>
  )
}
