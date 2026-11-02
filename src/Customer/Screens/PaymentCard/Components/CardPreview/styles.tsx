import { StyleSheet } from 'react-native';

import { colors, radius, spacing } from '../../../../../Shared/Styles/commonStyles';

export const styles = StyleSheet.create({
  card: {
    width: '100%',
    aspectRatio: 2.1,
    padding: spacing.md,
    justifyContent: 'space-between',
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    overflow: 'hidden',
  },
  decoration_circle: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: radius.full,
    backgroundColor: colors.white + '1A',
  },
  brand_badge: {
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    minWidth: 62,
    height: 40,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.sm,
    backgroundColor: colors.text + 'CC',
  },
  chip: {
    width: 14,
    height: 10,
    borderRadius: 2,
    backgroundColor: colors.warning,
  },
  brand_badge_text: {
    alignSelf: 'flex-end',
    fontSize: 11,
    fontWeight: '800',
    color: colors.white,
  },
  number_row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dots_group: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: radius.full,
    backgroundColor: colors.white,
  },
  last_digits: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.white,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  footer_right: {
    alignItems: 'flex-end',
  },
  footer_label: {
    fontSize: 9,
    letterSpacing: 0.5,
    color: colors.white + 'A6',
  },
  holder_name: {
    marginTop: 2,
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
  },
  expiry: {
    marginTop: 2,
    fontSize: 14,
    color: colors.white,
  },
});