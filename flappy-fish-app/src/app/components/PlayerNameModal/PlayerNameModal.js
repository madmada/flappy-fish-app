import * as React from 'react';
import PropTypes from 'prop-types';

import './PlayerNameModal.scss';

export const PlayerNameModal = ({
  playerName: currentPlayerName,
  setModalVisible,
  setPlayerName,
}) => {
  const [newPlayerName, setNewPlayerName] = React.useState(undefined);
  const [emptyErrorVisible, setEmptyErrorVisible] = React.useState(false);

  const onSave = (e) => {
    e.preventDefault();
    if (newPlayerName) {
      setPlayerName(newPlayerName);
      setModalVisible(false);
    } else {
      setEmptyErrorVisible(true);
    }
  };

  return (
    <div className={'player-name-modal__wrapper'}>
      <form className={'player-name-modal'} onSubmit={onSave}>
        <p className={'player-name-modal__header'}>
          {currentPlayerName ? 'Set your new name:' : 'Please set your name:'}
        </p>
        <input
          placeholder={currentPlayerName}
          type={'text'}
          className={'player-name-modal__input'}
          onChange={(e) => setNewPlayerName(e.target.value)}
        />
        {emptyErrorVisible && <p className={'player-name-modal__error'}>Please type in the name</p>}
        <div className={'player-name-modal__button-wrapper'}>
          <button
            className={'menu__button player-name-modal__button'}
            onClick={onSave}
          >
            Save
          </button>
          {currentPlayerName &&
            <button
              className={'menu__button player-name-modal__button'}
              onClick={() => setModalVisible(false)}
            >
              Cancel
            </button>
          }
        </div>
      </form>
    </div>
  );
};

PlayerNameModal.propTypes = {
  playerName: PropTypes.string,
  setModalVisible: PropTypes.func.isRequired,
  setPlayerName: PropTypes.func.isRequired,
};
