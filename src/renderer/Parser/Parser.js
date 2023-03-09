export default class Parser {

    static parse(text) {
        if (!text.trim()) return defaultTokens;

        const tokens = [];
        for (const line of text.split('\n')) {
            const token = this.parseLine(line);
            if (token) tokens.push(token);
        }

        if (tokens.length === 0) return defaultTokens;
        if (tokens[0].type == 'heading') tokens[0].type = 'title';
        else tokens.unshift({type: 'title', content: 'UpNext'});

        return tokens;
    }

    static stringify(tokens) {
        return tokens.map(token => this.stringifyToken(token)).join('\n\n') + '\n';
    }

    static parseLine(line) {
        const heading = this.parseHeading(line);
        if (heading) return heading;
        const task = this.parseTask(line);
        if (task) return task;
    }

    static parseHeading(line) {
        const match = line.match(/^#{1,6} (.+)$/);
        if (match) return {
            type: 'heading',
            content: match[1]
        }
    }

    static parseTask(line) {
        const match = line.match(/^- \[([ x])\] (.+)$/);
        if (!match) return;

        // We have to do some extra work to extract deadlines and priorities
        let task = match[2];
        const deadline = task.match(/^(\(\d\d?[/-]\d\d?[/-]\d\d(\d\d)?\))/);
        if (deadline) task = task.replace(deadline[0], '').trim();
        const priority = task.match(/\[(low|medium|high)\]$/);
        if (priority) task = task.replace(priority[0], '').trim();

        return {
            type: 'task',
            content: task,
            complete: match[1] === 'x',
            deadline: deadline ? deadline[0].replace(/[\(\)]/g, '') : null,
            priority: priority ? priority[1] : 'low'
        }
    }

    static stringifyToken(token) {
        if (token.type == 'title') return `# ${token.content}`;
        if (token.type == 'heading') return `## ${token.content}`;
        return `- [${token.complete ? 'x' : ' '}] ${token.deadline ? `(${token.deadline}) ` : ''}${token.content}${token.priority != 'low' ? ` [${token.priority}]` : ''}`;
    }
}

const defaultTokens = [
    {
        type: 'title',
        content: 'UpNext'
    }, {
        type: 'task',
        content: 'First task',
        complete: false
    }
];