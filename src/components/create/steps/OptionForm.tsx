import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import styled from "styled-components";
import TimePicker from "./TimePicker";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";
import { Vote } from "@/types/voteTypes";

const OptionForm = () => {
  const { control, setValue } = useFormContext<Vote>();
  const [timeOpen, setTimeOpen] = useState(Array(2).fill(false));
  const timeRef = useRef<(HTMLDivElement | null)[]>([]);
  const voteNums = Array.from({ length: 5 }, (_, i) => i + 1);

  useEffect(() => {
    if (timeRef && timeRef.current) {
      const handleClickOutside = (e: MouseEvent) => {
        if (timeRef.current.every((ref) => ref && !ref.contains(e.target as Node))) {
          setTimeOpen(Array(2).fill(false));
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, []);

  return (
    <div style={{ height: "500px", margin: "100px 20px 0 20px" }}>
      <VoteDiv>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>타이머</h2>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {timeOpen.map((timeSet, idx) => (
              <Controller
                key={idx}
                name={idx > 0 ? "minute" : "hour"}
                defaultValue={0}
                control={control}
                rules={{
                  required: "투표시간은 필수 입력 값입니다.",
                  max: {
                    value: 24,
                    message: `최대 24시간 까지 가능합니다.`,
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-around",
                      padding: "0 10px 0 10px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: "5px" }}
                      onClick={() => setTimeOpen((prev) => prev.map((p, i) => (i === idx ? true : p)))}
                      ref={(el) => {
                        timeRef.current[idx] = el;
                      }}
                    >
                      <Input
                        placeholder="00"
                        {...field}
                        error={error?.message}
                        value={field.value || ""}
                        autoComplete="off"
                      />
                      <h3>{idx > 0 ? "분" : "시간"}</h3>
                      {timeOpen[idx] && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            position: "absolute",
                          }}
                        >
                          <TimePicker type={idx > 0 ? "minute" : "hour"} name={field.name} setValue={setValue} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              />
            ))}
          </div>
        </div>

        <Controller
          name="userVoteLimit"
          control={control}
          defaultValue={1}
          rules={{ required: false, min: 1, max: 5 }}
          render={({ field, fieldState: { error } }) => (
            <Select
              label="투표가능 횟수"
              id="voteNums"
              options={voteNums.map((num) => ({ value: num, label: `${num}` }))}
              {...field}
              error={error?.message}
            />
          )}
        />
      </VoteDiv>
    </div>
  );
};

export default OptionForm;

const VoteDiv = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: "100px";
  height: "500px";
`;
