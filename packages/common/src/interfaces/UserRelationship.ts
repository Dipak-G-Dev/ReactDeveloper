export type RelationshipType = 'friend' | 'requested' | 'pending' | 'blocked' | 'blocking'
export type UserRelationship = {
  id: string
  createdAt: string
  updatedAt: string
  userId: string
  userRelationshipType: RelationshipType
  relatedUserId: string
}
