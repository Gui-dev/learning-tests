interface IButtonProps {
  label: string
  onClick: () => void
}

export const Button = ({ label, onClick }: IButtonProps) => {
  return (
    <button onClick={onClick}>{label}</button>
  )
}
