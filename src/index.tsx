import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  VoiceAgentContext,
  VoiceAgent,
  ConnectionConfig,
  AgentConfig,
  InputOptions,
  Channel,
  useAgentMessage,
  StringToAny,
  useInputModeToggleAgent,
} from "rapida-react";
import "./index.css";
import clsx from "clsx";
import { AudioMessagingAction } from "./actions/audio-messsaging-action";
import { SimpleMessagingAction } from "./actions/simple-messaging-action";
function App() {
  return (
    <div className="App">
      <VoiceAIAgent />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);

export const VoiceAIAgent = () => {
  return (
    <div className="bg-white dark:bg-slate-950 h-screen max-w-xl mx-auto rounded-3xl text-gray-600 dark:text-white px-4">
      <VoiceAgentContext.Provider
        value={
          new VoiceAgent(
            new ConnectionConfig(
              ConnectionConfig.WithSDK({
                // api key from rapida credentials
                apiKey: "{API_KEY}",
                userId: "random-user / identified-user",
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
              .withAgentCallback({
                onStart: () => {
                  console.log("onStart: ()");
                },
                onComplete: () => {
                  console.log("onComplete:");
                },
                onTranscript: () => {
                  console.log("onTranscript");
                },
                onInterrupt: () => {
                  console.log("onInterrupt");
                },
                onGeneration: () => {
                  console.log("onGeneration");
                },
                onCompleteGeneration: () => {
                  console.log("onCompleteGeneration");
                },
                onStartConversation: () => {
                  console.log("onStartConversation");
                },
                onCompleteConversation: () => {
                  console.log("onCompleteConversation");
                },
                onMessage: () => {
                  console.log("onMessage: ()");
                },
              })
              .addKeywords([
                "dictionary - which you want the model to speak clearly",
              ])
              .addArgument("name", "<name>")
              .addMetadata("utm_1", StringToAny("utm_X"))
          )
        }
      >
        {/* { Your code goes here} */}
        <div className="h-full flex flex-row flex-nowrap items-stretch">
          <div className="flex flex-col flex-grow min-w-0 flex-1">
            <Messages />
            <MessagingAction />
          </div>
        </div>
      </VoiceAgentContext.Provider>
    </div>
  );
};

const Messages = () => {
  const { messages } = useAgentMessage();
  return (
    <div className="flex flex-col justify-center flex-grow min-h-0 ">
      <div className={clsx("max-h-full flex gap-2 overflow-y-auto flex-col")}>
        <div className="flex flex-col items-center py-20 justify-center px-4">
          <div className="flex w-full flex-col items-start gap-1 ">
            <span className="text-3xl font-semibold">Hello,</span>
            <span className="text-xl font-medium opacity-80">
              How can I help you today?
            </span>
          </div>
        </div>
        <div className="divide-y divide-gray-400">
          {messages.map((x) => {
            return (
              <div className="px-4 py-2">
                {x.messages.map((x) => {
                  return <p>{x}</p>;
                })}
              </div>
            );
          })}
        </div>
        {/* <ConversationMessages /> */}
      </div>
    </div>
  );
};

export const MessagingAction = ({}) => {
  const { channel } = useInputModeToggleAgent();
  return (
    <div className={clsx("py-3")}>
      {channel === Channel.Audio ? (
        <AudioMessagingAction />
      ) : (
        <SimpleMessagingAction />
      )}
    </div>
  );
};
