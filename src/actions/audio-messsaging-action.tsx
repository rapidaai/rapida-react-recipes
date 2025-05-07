import React from "react";
import { FC, HTMLAttributes } from "react";
import { clsx as cn } from "clsx";
import { CircleFadingPlus, MessageSquareText, Mic, X } from "lucide-react";

import {
  useConnectAgent,
  useSelectInputDeviceAgent,
  useEnsureVoiceAgent,
  useInputModeToggleAgent,
} from "rapida-react";

/**
 *
 */
interface AudioMessagingActionProps extends HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
}

/**
 *
 * @param param0
 * @returns
 */
export const AudioMessagingAction: FC<AudioMessagingActionProps> = ({
  className,
  placeholder,
}) => {
  const ctx = useEnsureVoiceAgent();
  const { handleDisconnectAgent, handleConnectAgent, isConnected } =
    useConnectAgent();

  const { handleTextToggle, handleVoiceToggle } = useInputModeToggleAgent();
  const { devices, activeDeviceId, setActiveMediaDevice } =
    useSelectInputDeviceAgent({
      requestPermissions: true,
    });
  return (
    <div className={cn("relative flex items-center p-2 py-3 gap-4", className)}>
      <div className="flex items-center justify-center w-full">
        {!isConnected ? (
          <button
            onClick={async () => {
              await handleConnectAgent(ctx);
            }}
            className={cn(
              "flex items-center gap-1.5 border-[0.5px] border-blue-600/10 bg-gray-100 dark:bg-gray-950 rounded-full p-1 shadow-lg  px-4 py-2"
            )}
          >
            <CircleFadingPlus className="w-4 h-4" />
            <span className="font-medium text-sm">Click to talk</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 border-[0.5px] border-blue-600/10 bg-gray-100 dark:bg-gray-950 rounded-full p-1 shadow-lg ">
            <button
              onClick={async () => {
                await handleTextToggle(ctx);
              }}
              className="bg-blue-600/20 backdrop-blur-xl rounded-full shadow-lg p-2 border-[0.2px] border-blue-600/20 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              <MessageSquareText className="w-4 h-4" strokeWidth={2} />
            </button>
            <button
              onClick={async () => {
                await handleDisconnectAgent(ctx);
                await handleTextToggle(ctx);
              }}
              className="bg-red-500/20 backdrop-blur-xl rounded-full shadow-lg p-2 border-[0.2px] border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
