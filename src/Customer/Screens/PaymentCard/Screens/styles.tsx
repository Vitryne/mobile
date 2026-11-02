import { StyleSheet } from 'react-native';

import { colors, radius, spacing } from '../../../../Shared/Styles/commonStyles';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  back_button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.full,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    marginLeft: spacing.md,
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  form: {
    gap: spacing.md,
  },
  fields_row: {
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  row_item: {
    flex: 1,
  },
  info_box: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.success + '66',
    backgroundColor: colors.successSoft,
  },
  info_text: {
    flex: 1,
    fontSize: 12,
    color: colors.success,
  },
  checkbox_row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  checkbox_checked: {
    backgroundColor: colors.primary,
  },
  checkbox_label: {
    fontSize: 14,
    color: colors.text,
  },
  footer: {
    padding: spacing.md,
  },
  submit_button: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  submit_button_disabled: {
    opacity: 0.7,
  },
});