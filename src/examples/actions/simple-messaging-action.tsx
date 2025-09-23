import React from "react";
import { useConnectAgent, useInputModeToggleAgent } from "@rapidaai/react";
import { Send } from "lucide-react";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { VoiceAgent } from "@rapidaai/react";

interface SimpleMessagingAcitonProps extends HTMLAttributes<HTMLDivElement> {
  voiceAgent: VoiceAgent;
  placeholder?: string;
}
export const SimpleMessagingAction: FC<SimpleMessagingAcitonProps> = ({
  className,
  voiceAgent,
  placeholder,
}) => {
  const { handleVoiceToggle } = useInputModeToggleAgent(voiceAgent);
  const { handleConnectAgent, handleDisconnectAgent, isConnected } =
    useConnectAgent(voiceAgent);

  const [isLoading, setIsLoading] = useState(false);

  //
  useEffect(() => {
    if (!isConnected) {
      setIsLoading(false);
    }
  }, [isConnected]);

  const handleDisconnectClick = () => {
    if (isConnected) {
      setIsLoading(true);
      handleDisconnectAgent();
    } else {
      handleConnectAgent();
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmitForm = (data: any) => {
    voiceAgent?.onSendText(data.message);
    reset();
  };

  return (
    <div>
      <AnimatePresence>
        <motion.div
          className={clsx(
            "flex justify-center items-center",
            !isConnected && "hidden"
          )}
        >
          <button
            onClick={async () => {
              await handleDisconnectClick();
            }}
            disabled={isLoading}
            className={clsx(
              "px-3 py-[4px] flex items-center space-x-1.5 bg-red-600 text-white border border-red-700/50"
            )}
          >
            {isLoading ? (
              <span>loading</span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm6-2.438c0-.724.588-1.312 1.313-1.312h4.874c.725 0 1.313.588 1.313 1.313v4.874c0 .725-.588 1.313-1.313 1.313H9.564a1.312 1.312 0 0 1-1.313-1.313V9.564Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span className="text-sm font-medium">End session</span>
          </button>
        </motion.div>
      </AnimatePresence>
      <form
        className={clsx(
          "relative flex items-center p-4 border-t gap-4 focus-within:border-blue-600  dark:border-gray-700 dark:bg-gray-950 bg-gray-100 border-gray-400",
          className
        )}
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <textarea
          className="resize-none h-[40px] w-full text-base disabled:opacity-50 disabled:pointer-events-none dark:placeholder-gray-500 dark:text-gray-300 border-none bg-transparent focus:border-none focus:outline-none"
          placeholder={"Type anything..."}
          {...register("message", {
            required: "Please write your message.",
          })}
          required
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleSubmit(onSubmitForm)(e);
            }
          }}
        ></textarea>

        <div className="absolute rounded-b-lg right-2 my-auto w-fit">
          {isValid ? (
            <button
              type="submit"
              className="inline-flex shrink-0 justify-center items-center h-10 w-10 text-white bg-blue-600 hover:bg-blue-600 focus:z-10 focus:outline-none focus:bg-blue-600"
            >
              <Send className="shrink-0 size-5" strokeWidth="2" />
            </button>
          ) : (
            <button
              onClick={async () => {
                !isConnected && (await handleConnectAgent());
                await handleVoiceToggle();
              }}
              className="voice-action relative flex h-9 items-center justify-center bg-blue-600 text-white transition-colors focus-visible:outline-none focus-visible:outline-black disabled:text-gray-50 disabled:opacity-30 can-hover:hover:opacity-70 min-w-8 p-2"
            >
              <div className="flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 4C8.67157 4 8 4.67157 8 5.5V18.5C8 19.3284 8.67157 20 9.5 20C10.3284 20 11 19.3284 11 18.5V5.5C11 4.67157 10.3284 4 9.5 4Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M13 8.5C13 7.67157 13.6716 7 14.5 7C15.3284 7 16 7.67157 16 8.5V15.5C16 16.3284 15.3284 17 14.5 17C13.6716 17 13 16.3284 13 15.5V8.5Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M4.5 9C3.67157 9 3 9.67157 3 10.5V13.5C3 14.3284 3.67157 15 4.5 15C5.32843 15 6 14.3284 6 13.5V10.5C6 9.67157 5.32843 9 4.5 9Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M19.5 9C18.6716 9 18 9.67157 18 10.5V13.5C18 14.3284 18.6716 15 19.5 15C20.3284 15 21 14.3284 21 13.5V10.5C21 9.67157 20.3284 9 19.5 9Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <span className="whitespace-nowrap pl-1 pr-1 text-[13px] font-semibold [display:--force-hide-label]">
                Voice
              </span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
