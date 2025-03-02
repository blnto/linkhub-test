// src/core/domain/profile/BusinessCard.ts

import { ProfileLink } from "./ProfileLink";

/**
 * Represents a single side of a business card
 */
export class BusinessCardSide {
  constructor(
    public readonly id: string,
    public title: string,
    public subtitle: string,
    public description: string,
    public links: ProfileLink[] = [],
    public bgColor?: string,
    public textColor?: string,
    public accentColor?: string
  ) {}

  /**
   * Create a copy of this side with updated properties
   */
  update(updates: Partial<Omit<BusinessCardSide, 'id'>>): BusinessCardSide {
    return new BusinessCardSide(
      this.id,
      updates.title ?? this.title,
      updates.subtitle ?? this.subtitle,
      updates.description ?? this.description,
      updates.links ?? [...this.links],
      updates.bgColor ?? this.bgColor,
      updates.textColor ?? this.textColor,
      updates.accentColor ?? this.accentColor
    );
  }
}

/**
 * Represents a multi-sided business card for a profile
 */
export class BusinessCard {
  constructor(
    public readonly id: string,
    public readonly profileId: string,
    public sides: BusinessCardSide[] = [],
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {
    // Ensure there's always at least one side
    if (sides.length === 0) {
      this.sides = [
        new BusinessCardSide(
          'side-1',
          'Your Name',
          '@username',
          'Your professional description goes here'
        )
      ];
    }
  }

  /**
   * Add a new side to the business card
   */
  addSide(side: BusinessCardSide): BusinessCard {
    return new BusinessCard(
      this.id,
      this.profileId,
      [...this.sides, side],
      this.createdAt,
      new Date()
    );
  }

  /**
   * Remove a side by its ID
   * Note: Cannot remove the first side (it's required)
   */
  removeSide(sideId: string): BusinessCard {
    if (this.sides.length <= 1 || this.sides[0].id === sideId) {
      return this; // Cannot remove the first side or if there's only one side
    }

    return new BusinessCard(
      this.id,
      this.profileId,
      this.sides.filter(side => side.id !== sideId),
      this.createdAt,
      new Date()
    );
  }

  /**
   * Update a side by its ID
   */
  updateSide(sideId: string, updates: Partial<Omit<BusinessCardSide, 'id'>>): BusinessCard {
    const updatedSides = this.sides.map(side =>
      side.id === sideId ? side.update(updates) : side
    );

    return new BusinessCard(
      this.id,
      this.profileId,
      updatedSides,
      this.createdAt,
      new Date()
    );
  }

  /**
   * Reorder the sides
   */
  reorderSides(orderedSideIds: string[]): BusinessCard {
    // Keep sides not in the ordered list (should not happen, but just in case)
    const unorderedSides = this.sides.filter(
      side => !orderedSideIds.includes(side.id)
    );

    // Map ordered IDs to their sides
    const orderedSides = orderedSideIds
      .map(id => this.sides.find(side => side.id === id))
      .filter(side => side !== undefined) as BusinessCardSide[];

    return new BusinessCard(
      this.id,
      this.profileId,
      [...orderedSides, ...unorderedSides],
      this.createdAt,
      new Date()
    );
  }

  /**
   * Create a business card from a profile
   */
  static fromProfile(profileId: string, profile: any): BusinessCard {
    const id = crypto.randomUUID?.() || `card-${Date.now()}`;

    // Create first side with profile info
    const firstSide = new BusinessCardSide(
      'side-1',
      profile.name || 'Your Name',
      profile.username ? `@${profile.username}` : '@username',
      profile.description || 'Your professional description',
      profile.links?.slice(0, 4) || []
    );

    const sides = [firstSide];

    // Add additional sides for remaining links
    if (profile.links && profile.links.length > 4) {
      const extraLinks = profile.links.slice(4);

      // Group extra links into sets of 6 for additional sides
      for (let i = 0; i < extraLinks.length; i += 6) {
        const sideLinks = extraLinks.slice(i, i + 6);
        sides.push(
          new BusinessCardSide(
            `side-${sides.length + 1}`,
            'More Links',
            `Page ${sides.length + 1}`,
            '',
            sideLinks
          )
        );
      }
    }

    return new BusinessCard(id, profileId, sides);
  }
}