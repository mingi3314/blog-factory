import React, { useEffect, useRef, useState } from "react"

import styled from "styled-components"

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
      <DropdownButton onClick={toggleDropdown}>Family Sites</DropdownButton>
      {isOpen && (
        <DropdownMenu>
          <DropdownItem href="https://alphasquare.co.kr/home">
            AlphaSquare
          </DropdownItem>
        </DropdownMenu>
      )}
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

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 100%; /* 부모 요소의 아래에서 100% 위로 위치 */
  background-color: var(--color-post-background);
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  min-width: 160px;
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
