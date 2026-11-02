import { StyleSheet } from 'react-native';

import { colors, radius, spacing } from '../../../../../Shared/Styles/commonStyles';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 13,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  label_required: {
    color: colors.danger,
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.white,
  },
  input_container_valid: {
    borderColor: colors.success,
  },
  input_container_error: {
    borderColor: colors.danger,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  error_text: {
    marginTop: spacing.xs,
    fontSize: 12,
    color: colors.danger,
  },
});