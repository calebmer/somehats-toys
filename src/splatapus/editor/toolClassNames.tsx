import { useLive } from "@/lib/live";
import { ToolType } from "@/splatapus/editor/tools/ToolType";
import { Splatapus } from "@/splatapus/editor/useEditor";

export type ToolClassNames = {
    [Tool in ToolType]: {
        gradient500: string;
        border500: string;
        ring500: string;
    };
};

export const toolClassNames: ToolClassNames = {
    [ToolType.Draw]: {
        gradient500: "from-fuchsia-500 to-violet-500",
        border500: "border-purple-500",
        ring500: "ring-purple-500",
    },
    [ToolType.Rig]: {
        gradient500: "from-cyan-500 to-blue-500",
        border500: "border-sky-500",
        ring500: "ring-sky-500",
    },
    [ToolType.Play]: {
        gradient500: "from-lime-500 to-emerald-500",
        border500: "border-green-500",
        ring500: "ring-green-500",
    },
};

export function useToolClassNames(splatapus: Splatapus) {
    const selectedToolType = useLive(
        () => splatapus.interaction.selectedTool.live().type,
        [splatapus],
    );
    return toolClassNames[selectedToolType];
}
