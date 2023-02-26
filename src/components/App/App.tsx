import React from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactsList/ContactList';
import Filter from '../Filter/Filter';
import Tag from '../Tag/Tag';
import s from './App.module.css';

const App: React.FC = () => {
  return (
    <div className={s.container}>
      <h1 className={s.titlePhonebook}>Phonebook</h1>
      <ContactForm/>
      <h2 className={s.titleContacts}>Contacts</h2>
      <Filter/>
      <ContactList />
      <Tag type="time" label="2"/>
    </div>
  );
}

export default App;



.card--small {
  position: relative;
  width: 312px;
  background-color: #121533;
  border-radius: 10px;
  padding: 24px 12px;
  display: flex;
}

.card--large {
  width: 1096px;
  background-color: #121533;
  border-radius: 10px;
  padding: 18px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card--small .card__contentWrapper {
  display: flex;
  flex-direction: column-reverse;
}

.card--large .card__contentWrapper {
  display: flex;
  align-items: center;
  gap: 21px;
}

.card__wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.card--large .card__content {
  width: 624px;
}

.card--small .card__wrapper {
  position: absolute;
  right: 12px;
  gap: 20px;
}

.card--large .card__bigWrapper {
  display: flex;
  align-items: center;
  gap: 20px;
}

.card__list--small {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.card__list--large {
  display: flex;
  flex-wrap: wrap;
  column-gap: 4px;
  row-gap: 8px;
  width: 129px;
}

.card__title {
  font-family: 'Inter';
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: #f8f8f8;
  margin-bottom: 4px;
}

.card__text {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #9d9fb5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &--custom {
    font-family: 'Inter';
    font-weight: 700;
    font-size: 20px;
    line-height: 1.3;
    color: #f8f8f8;
    padding-top: 37px;
    padding-bottom: 43px;
  }
}

.card__icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f2cb40;
  border-radius: 51px;

  &--custom {
    composes: card__icon;
    background-color: #47C05D;
  }

  .card--small & {
    margin-bottom: 12px;
  }
}

.card__notificationWrapper {
    display: flex;
    align-items: center;
    gap: 21px;
    padding-right: 4px;
}

.card__close {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
}




import React from 'react'
import { Tag } from '../Tag'
import s from './Card.module.scss'

interface ICard {
  type: 'notification' | 'coin' | 'info'
  size?: 'large' | 'small'
  hideQuestions?: boolean
  item: IItem
}

interface IItem {
  title: string
  text: string
  fields?: string[]
  questions?: number
  time: number
}

export const Card: React.FC<ICard> = ({
  type,
  item,
  size = 'large',
  hideQuestions = false,
}) => {
  const { title, text, fields, questions, time } = item

  return (
    <div className={`${s[`card--${size}`]}`}>
      <div className={s.card__bigWrapper}>
        <p className={s.card__icon}>
          <svg width="24" height="24">
            <use href=""></use>
          </svg>
        </p>
        <div className={s.card__contentWrapper}>
          <div className={s.card__content}>
            <p className={s.card__title}>{title}</p>
            <p className={s.card__text}>{text}</p>
          </div>
          {fields && type==="info" && (
            <ul className={`${s[`card__list--${size}`]}`}>
              {fields.map((item, index) => (
                <li key={index}>
                  <Tag type="field" label={item} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {type === 'info' && (
        <div className={s.card__wrapper}>
          {!hideQuestions && questions && (
            <Tag type="questions" label={questions.toString()} />
          )}
          <Tag type="time" label={time.toString()} />
        </div>
      )}
      {type !== 'info' && (
        <div className={s.card__notificationWrapper}>
          <Tag type="questions" label={time.toString()} />
          <p className={s.card__close}>
            <svg width="8" height="8">
              <use href=""></use>
            </svg>
          </p>
        </div>
      )}
    </div>
  )
}


import React from 'react'
import { Tag } from '@ui/Tag'
import s from './Card.module.scss'

interface ICard {
  type: 'notification' | 'coin' | 'info'
  size?: 'large' | 'small'
  hideNumber?: boolean
  onClick?: () => void
  item: IItem
}

interface IItem {
  title: string
  text: string
  fields?: string[]
  number?: number
  time: number
}

export const Card: React.FC<ICard> = ({
  type,
  item,
  size = 'large',
  hideNumber = false,
  onClick
}) => {
  const { title, text, fields, number, time } = item

  const addBackgroundColor = (type: string):string => {
    if (type==="notification") {return "green";}
    if (type==="coin") {return "blue";}
    return "yellow"
  }

   return (
    <li className={`${s[`card--${size}`]}`}>
      <div className={s.card__infoWrapper}>
        <p className={`${s[`card__icon--${addBackgroundColor(type)}`]}`}>
          <svg width="24" height="24">
            <use href=""></use>
          </svg>
        </p>
        <div className={s.card__contentWrapper}>
          <div className={s.card__content}>
            <p className={s.card__title}>{title}</p>
            <p className={s.card__text}>{text}</p>
          </div>
          {fields && type === 'info' && (
            <ul className={s.card__list}>
              {fields.map((item, index) => (
                <li key={index}>
                  <Tag type="field" label={item} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={`${s.card__addInfoWrapper} ${type!=="info" && s['card__addInfoWrapper--notification']}`}>
        {!hideNumber && number && (
          <Tag
            type="number"
            label={type === 'info' ? number + ' запитань' : number + ' min ago'}
          />
        )}
        {type === 'info' && <Tag type="time" label={time.toString()} />}
        {type !== 'info' && (
          <button className={s.card__close} onClick={onClick}>
            <svg width="8" height="8">
              <use href=''></use>
            </svg>
          </button>
        )}
      </div>
    </li>
  )
}



.card--small {
  position: relative;
  width: 312px;
  display: flex;

  background-color: var(--components-cl);
  border-radius: 10px;
  padding: 24px 12px;
}

.card--large {
  width: 1096px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--components-cl);
  border-radius: 10px;
  padding: 18px 20px 18px 25px;
}

.card__infoWrapper {
  .card--large & {
    display: flex;
    align-items: center;
    gap: 20px;
  }
}

.card__icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 51px;

  &--green {
    composes: card__icon;
    background-color: var(--success-cl);
  }

  &--yellow {
    composes: card__icon;
    background-color: var(--message-cl);
  }

  &--blue {
    composes: card__icon;
    background-color: var(--copy-btn-cl);
  }

  .card--small & {
    margin-bottom: 12px;
  }
}

.card__contentWrapper {
  display: flex;

  .card--small & {
    flex-direction: column-reverse;
  }

  .card--large & {
    align-items: center;
    gap: 21px;
  }
}

.card__content {
  .card--large & {
    width: 624px;
  }
}

.card__title {
  font-family: var(--font-family);
  font-weight: var(--bold);
  font-size: var(--text-lg);
  line-height: 1.5;
  color: var(--primary-txt-cl);
  margin-bottom: 4px;
}

.card__text {
  font-family: var(--font-family);
  font-weight: var(--regular);
  font-size: var(--text-md);
  line-height: 1.43;
  color: var(--secondary-txt-cl);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card__list {
  display: flex;

  .card--small & {
    gap: 8px;
    margin-bottom: 16px;
  }

  .card--large & {
    width: 129px;
    flex-wrap: wrap;
    column-gap: 4px;
    row-gap: 8px;
  }
}

.card__addInfoWrapper {
  display: flex;
  align-items: center;
  gap: 10px;

  &--notification {
    gap: 21px;
    padding-right: 4px;
  }

  .card--small & {
    position: absolute;
    right: 12px;
    gap: 20px;
  }
}

.card__close {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}



