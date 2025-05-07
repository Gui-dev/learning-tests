import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Button } from '../button'

describe('<Button />', () => {
  it('should be able renders with correct label', () => {
    render(<Button label="Clique" onClick={() => { }} />)

    expect(screen.getByText('Clique')).toBeInTheDocument()
  })

  it('should be able calls onClick when clicked', () => {
    const handleOnClick = vi.fn()
    render(<Button label="Clique" onClick={handleOnClick} />)
    fireEvent.click(screen.getByText('Clique'))

    expect(handleOnClick).toHaveBeenCalledTimes(1)
  })
})
