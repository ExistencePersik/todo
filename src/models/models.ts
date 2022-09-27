export interface ITodos {
  id: string,
  title: string,
  completed: boolean
}

export interface IChecked {
  id: string,
  completed: boolean
}

export interface IAchieved {
  title: string,
}

export interface IRemoved {
  id: string,
}
