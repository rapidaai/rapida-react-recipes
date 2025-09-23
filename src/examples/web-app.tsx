import React from "react";
import {
  AgentConfig,
  Channel,
  ConnectionConfig,
  InputOptions,
  StringToAny,
  useAgentMessages,
  useInputModeToggleAgent,
  VoiceAgent,
} from "@rapidaai/react";
import clsx from "clsx";
import { FC } from "react";
import { AudioMessagingAction } from "./actions/audio-messsaging-action";
import { SimpleMessagingAction } from "./actions/simple-messaging-action";

export const WebAgent = () => {
  return (
    <VoiceAIAgent
      rapidaAgent={
        new VoiceAgent(
          ConnectionConfig.DefaultConnectionConfig(
            ConnectionConfig.WithSDK({
              ApiKey: "{API_KEY}",
              UserId: "random-user / identified-user",
            })
          ).withConnectionCallback({
            onDisconnect: () => {
              // do what you want when finished
              console.log("disconnect");
            },
            onConnect() {
              console.log("connected");
            },
            onError() {
              console.log("error");
            },
          }),
          new AgentConfig(
            // replace this with actual agent id from rapida console
            "{AGENT_ID}",
            // you can select only Audio/ Text
            new InputOptions([Channel.Audio, Channel.Text], Channel.Text)
          )
            .addKeywords([
              "dictionary - which you want the model to speak clearly",
            ])
            .addArgument("name", "<name>")
            .addMetadata("utm_1", StringToAny("utm_X")),
          {
            onAssistantMessage: (msg) => {
              console.log("onStart: ()");
            },
            onUserMessage: (args) => {
              console.log("onComplete:");
            },
            onConfiguration: (args) => {
              console.log("onTranscript");
            },
            onInterrupt: (args) => {
              console.log("onInterrupt");
            },
            onMessage: (args) => {
              console.log("onGeneration");
            },
          }
        )
      }
    />
  );
};

export const VoiceAIAgent: FC<{ rapidaAgent: VoiceAgent }> = ({
  rapidaAgent,
}) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-950/50 h-screen max-w-xl mx-auto text-gray-600 dark:text-white border-gray-400">
      <div className="h-full flex flex-row flex-nowrap items-stretch">
        <div className="flex flex-col flex-grow min-w-0 flex-1">
          <Messages rapidaAgent={rapidaAgent} />
          <MessagingAction rapidaAgent={rapidaAgent} />
        </div>
      </div>
    </div>
  );
};

const Messages: FC<{ rapidaAgent: VoiceAgent }> = ({ rapidaAgent }) => {
  const { messages } = useAgentMessages(rapidaAgent);
  return (
    <div className="flex flex-col justify-center flex-grow min-h-0  px-4">
      <div className={clsx("max-h-full flex gap-2 overflow-y-auto flex-col")}>
        <div className="flex flex-col items-center py-20 justify-center px-4">
          <div className="flex w-full flex-col items-start gap-1 ">
            <span className="text-3xl ">Hello,</span>
            <span className="text-xl opacity-80">
              How can I help you today?
            </span>
          </div>
        </div>
        <div className="divide-y divide-gray-400">
          {messages.map((x, idx) => {
            return (
              <div className="px-4 py-2" key={idx}>
                {x.messages.map((x) => {
                  return <p>{x}</p>;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const MessagingAction: FC<{ rapidaAgent: VoiceAgent }> = ({
  rapidaAgent,
}) => {
  const { channel } = useInputModeToggleAgent(rapidaAgent);
  return (
    <div>
      {channel === Channel.Audio ? (
        <AudioMessagingAction voiceAgent={rapidaAgent} />
      ) : (
        <SimpleMessagingAction voiceAgent={rapidaAgent} />
      )}
    </div>
  );
};
