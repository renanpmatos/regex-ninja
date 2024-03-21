"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bug } from "lucide-react";
import { FormEvent } from "react";

export default function Home() {
  interface regexProps {
    target: string;
    regex: string;
    index: boolean;
    groups: boolean;
  }

  const makeResult = (
    result: any,
    index: any,
    lastIndex: any,
    showIndex: any
  ) => {
    var textIndex = showIndex ? " [" + index + "-" + lastIndex + "]" : "";

    return {
      result: result + textIndex,
      index: index,
      lastIndex: lastIndex,
    };
  };

  const testRegex = ({ target, regex, index, groups }: regexProps) => {
    let regexObj = new RegExp(regex, "g");

    var result;
    var dataResult = [];

    while ((result = regexObj.exec(target))) {
      if (result[0] === "") {
        throw Error("Regex returns null value");
      }

      dataResult.push(
        makeResult(
          groups ? result.join(" ||| ") : result[0],
          result.index,
          regexObj.lastIndex,
          index
        )
      );
    }

    var execTime = executionTime(target, regex);

    return {
      data: dataResult,
      time: execTime,
    };
  };

  const executionTime = (target: string, expression: string) => {
    let objRegex = new RegExp(expression, "g");
    var ini = performance.now();
    objRegex.test(target);
    var end = performance.now();
    return end - ini;
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
  }

  return (
    <div className="h-full w-full m-4o%">
      <form onSubmit={onSubmit} className="">
        <div className="m-10">
          <Label htmlFor="target">Inform a Target String</Label>
          <Textarea className="border-2" name="target" placeholder="Target" />
        </div>
        <div className="m-10">
          <Label htmlFor="regex">Inform a Regular Expression</Label>
          <Input
            className="border-2"
            type="text"
            name="regex"
            placeholder="Regex"
          />
        </div>
        <div className="m-10">
          <Button className="">
            <Bug className="mr-2 h-4 w-4" /> Debug Regex
          </Button>
        </div>
      </form>
      <div className="flex flex-row space-x-5">
        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-md">
          <Checkbox className="shadow-sm" />
          <div className="space-y-1 leading-none flex flex-col">
            <h2 className="font-medium">Mostrar Índices</h2>
            <p className="text-slate-500">
              Confira os Indices da sua Expressao
            </p>
          </div>
        </div>
        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-md">
          <Checkbox className="shadow-sm" />
          <div className="space-y-1 leading-none flex flex-col">
            <h2 className="font-medium">Mostrar Grupos</h2>
            <p className="text-slate-500">Confira os Grupos da sua Expressao</p>
          </div>
        </div>
      </div>
      <div className="my-10">
        <div className="h-[480px] w-full bg-slate-50 border broder-slate-500"></div>
      </div>
    </div>
  );
}
