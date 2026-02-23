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
import { MessagingAction } from "./messaging/messaging-action";

export const WebAgent = () => {
  return (
    <VoiceAIAgent
      rapidaAgent={
        new VoiceAgent(
          ConnectionConfig.DefaultConnectionConfig(
            ConnectionConfig.WithSDK({
              ApiKey: "APIKEY_xxx", // replace this with actual api key from rapida console
              UserId: "random-user / identified-user",
            }),
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
            new InputOptions([Channel.Audio, Channel.Text], Channel.Text),
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
          },
        )
      }
    />
  );
};

export const VoiceAIAgent: FC<{ rapidaAgent: VoiceAgent }> = ({
  rapidaAgent,
}) => {
  return (
    <div className="h-screen mx-auto text-gray-600 dark:text-white border-gray-200 border-x dark:border-gray-800">
      <div className="h-full flex flex-row flex-nowrap items-stretch">
        <div className="flex flex-col flex-grow min-w-0 flex-1">
          <Messages rapidaAgent={rapidaAgent} />
          <MessagingAction
            assistant={null}
            placeholder="How can I help you?"
            voiceAgent={rapidaAgent}
          />
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
