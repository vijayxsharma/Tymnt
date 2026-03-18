import React from 'react'
import "./Skeleton.css";
const LoadingSkeleton = () => {
  return (
    <div className="home-skeleton">

      {/* Banner */}
      <div className="sk-banner"></div>

      {/* Search bar */}
      <div className="sk-search"></div>

      {/* Categories */}
      <div className="sk-categories">
        <div className="sk-chip"></div>
        <div className="sk-chip"></div>
        <div className="sk-chip"></div>
        <div className="sk-chip"></div>
      </div>

      {/* Request Card */}
      <div className="sk-card">

        <div className="sk-header">
          <div className="sk-avatar"></div>

          <div className="sk-user-text">
            <div className="sk-line title"></div>
            <div className="sk-line subtitle"></div>
          </div>

        </div>

        <div className="sk-line text"></div>
        <div className="sk-line text short"></div>

        <div className="sk-tags">
          <div className="sk-tag"></div>
          <div className="sk-tag"></div>
          <div className="sk-tag"></div>
        </div>

      </div>

    </div>
  )
}

export default LoadingSkeleton
