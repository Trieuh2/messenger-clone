'use client';

import {
  ChangeEvent,
  useState,
  KeyboardEvent,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

export interface MessageInputRef {
  resetTextareaHeight: () => void;
}

interface MessageInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  onEnterPress: () => void;
  watchedMessage: string;
}

const MessageInput = forwardRef<MessageInputRef, MessageInputProps>(
  function MessageInput(props, ref) {
    const {
      placeholder,
      id,
      required,
      register,
      onEnterPress,
      watchedMessage,
    } = props;

    const [content, setContent] = useState('');
    const MIN_HEIGHT_REM = 2.5;
    const MAX_HEIGHT_REM = 8;
    const BASE_FONT_SIZE = 16;

    const resizeTextarea = (textareaElement: HTMLTextAreaElement) => {
      textareaElement.style.height = '0';
      const newHeight = Math.min(
        Math.max(textareaElement.scrollHeight / BASE_FONT_SIZE, MIN_HEIGHT_REM),
        MAX_HEIGHT_REM
      );
      textareaElement.style.height = `${newHeight}rem`;
    };

    const resetTextareaHeight = () => {
      const textareaElement = document.getElementById(
        id
      ) as HTMLTextAreaElement;

      if (textareaElement) {
        textareaElement.style.height = `${MIN_HEIGHT_REM}rem`;
      }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        onEnterPress();
        resetTextareaHeight();
      }
    };

    const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setTimeout(() => {
        resizeTextarea(event.target);
      }, 0);
    };

    useEffect(() => {
      const textareaElement = document.getElementById(
        id
      ) as HTMLTextAreaElement;

      if (textareaElement) {
        setContent(watchedMessage);
        resizeTextarea(textareaElement);
      }
    }, [watchedMessage, id]);

    useEffect(() => {
      const textareaElement = document.getElementById(
        id
      ) as HTMLTextAreaElement;
      if (textareaElement) {
        textareaElement.addEventListener('keyup', (event) => {
          if (event.key === 'Backspace') {
            resizeTextarea(textareaElement);
          }
        });
      }

      return () => {
        if (textareaElement) {
          textareaElement.removeEventListener('keyup', (event) => {
            if (event.key === 'Backspace') {
              resizeTextarea(textareaElement);
            }
          });
        }
      };
    }, [id]);

    useImperativeHandle(ref, () => ({
      resetTextareaHeight,
    }));

    return (
      <div className="flex items-center w-full">
        <textarea
          id={id}
          autoComplete={id}
          {...register(id, { required })}
          placeholder={placeholder}
          value={content}
          onInput={handleInput}
          className="
          text-black
            font-light
            py-2
            px-4
            bg-neutral-100
            w-full
            h-10
            max-h-32
            rounded-2xl
            focus:outline-none
            overflow-x-hidden
            resize-none
          "
          onKeyDown={handleKeyDown}
        />
      </div>
    );
  }
);

MessageInput.displayName = 'MessageInput';

export default MessageInput;
