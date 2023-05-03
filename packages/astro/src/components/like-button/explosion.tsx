import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classnames from "classnames"
import { useLayoutEffect } from "react"

import { useTransitionClass } from "./use-transition-class"

import "./explosion.css"

const HeartExplosionParticle = ({ explode, index }: { explode: boolean; index: number }) => {
  const {
    className: explodeAnimationClassName,
    start: startExplodeAnimation,
    end: endExplodeAnimation,
  } = useTransitionClass("explosion")

  useLayoutEffect(() => {
    if (explode) {
      startExplodeAnimation()
    }
  }, [explode, startExplodeAnimation])

  return (
    <div
      className={classnames([
        `explosion__particle-${index}`,
        "h-full w-full translate-x-1/2 text-lime-500",
        explodeAnimationClassName,
      ])}
      onTransitionEnd={endExplodeAnimation}
      onAnimationEnd={endExplodeAnimation}
    >
      <FontAwesomeIcon size="2x" icon={solid("heart")} />
    </div>
  )
}

export const LikeButtonExplosion = ({ explode }: { explode: boolean; onExplosionFinished: () => void }) => {
  return (
    <div className="explosion absolute left-0 h-full w-full">
      {[...new Array(4)].map((_, i) => (
        <HeartExplosionParticle key={i} index={i} explode={explode} />
      ))}
    </div>
  )
}
