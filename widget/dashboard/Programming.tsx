import { execAsync } from "ags/process";
import { createPoll } from "ags/time";
import GLib from "gi://GLib";

export default function Programming() {
    const scriptPath = `${GLib.get_home_dir()}/.config/ags/scripts/flowmodoro.sh`;

    const flowmodoro = createPoll("programming-tracking", 100, async () => {
        try {
            const output = await execAsync(scriptPath);
            const json = JSON.parse(output);
            return `${json.current} (${json.alt}) ${json.time}`;
        } catch (e) {
            return "❌ Error ejecutando script";
        }
    })

    return (
        <box class="programming">
            <label label={flowmodoro} />
        </box>
    )
}

