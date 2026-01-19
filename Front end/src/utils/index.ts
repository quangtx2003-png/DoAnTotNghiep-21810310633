export const formatVND = (value: number) =>
  new Intl.NumberFormat('vi-VN', {
    maximumFractionDigits: 0,
  }).format(value)
