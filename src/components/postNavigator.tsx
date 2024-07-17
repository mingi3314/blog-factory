import React from "react"

import { Link } from "gatsby"
import { styled } from "styled-components"

import type Post from "../types/Post"

interface PostNavigatorProps {
  prevPost?: Post
  nextPost?: Post
}

const PostNavigator: React.FC<PostNavigatorProps> = ({
  prevPost,
  nextPost,
}) => {
  return (
    <Container>
      <div className="post-navigator-card-wrapper">
        {nextPost && (
          <Link key={nextPost.id} to={nextPost.slug as string}>
            <Card>
              <Direction>Prev</Direction>
              <Title>{nextPost.title}</Title>
            </Card>
          </Link>
        )}
      </div>
      <div className="post-navigator-card-wrapper">
        {prevPost && (
          <Link key={prevPost.id} to={prevPost.slug as string}>
            <Card>
              <Direction>Next</Direction>
              <Title>{prevPost.title}</Title>
            </Card>
          </Link>
        )}
      </div>
    </Container>
  )
}

const Container = styled.div`
  width: var(--post-width);
  margin: 0 auto;
  margin-bottom: var(--padding-sm);
  display: flex;
  justify-content: space-between;
  gap: var(--padding-sm);

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    width: 100%;
    padding: 0 var(--padding-sm);
    flex-direction: column;
    gap: var(--padding-sm);
  }
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--color-gray-1);
  border-radius: 6px;
  padding: 15px;
`

const Direction = styled.div`
  font-size: var(--text-sm)
  font-weight: 500;
  color: grey;
  margin-bottom: 5px;
`

const Title = styled.div`
  font-size: var(--text-md)
  font-weight: 600;
  margin-bottom: 7px;
  line-height: 1.4;
`

export default PostNavigator
