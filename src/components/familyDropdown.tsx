import React, { useEffect, useRef, useState } from "react"

import styled from "styled-components"

interface FamilySite {
  name: string
  url: string
}

const familySites: FamilySite[] = [
  { name: "vintage-vibes-blog", url: "https://vintage-vibes-blog.netlify.app/" },
  { name: "blog-stream", url: "https://blog-stream.netlify.app/" },
  { name: "green-living-blog", url: "https://green-living-blog.netlify.app/" },
  // Add more family sites here
]

const FamilyDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown} aria-expanded={isOpen}>
        Example Blogs
      </DropdownButton>
      <DropdownMenu aria-hidden={!isOpen} $isOpen={isOpen}>
        {familySites.map(site => (
          <DropdownItem key={site.url} href={site.url}>
            {site.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  )
}

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: var(--color-blue);
  cursor: pointer;
  font-size: var(--text-sm);
  &:hover {
    text-decoration: underline;
  }
`

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 100%;
  background-color: var(--color-post-background);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  min-width: 160px;
  visibility: ${props => (props.$isOpen ? "visible" : "hidden")};
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  transition:
    visibility 0s,
    opacity 0.2s linear;
`

const DropdownItem = styled.a`
  color: var(--color-blue);
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  &:hover {
    background-color: var(--color-gray-2);
    text-decoration: underline;
  }
`

export default FamilyDropdown
