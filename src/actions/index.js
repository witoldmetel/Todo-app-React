let nextTaskId = 4; //because default I init first 3 tasks
export const addTask = (text) => {
    return {
        type: 'ADD_TASK',
        randomFace: nextTaskId,
        taskNumber: nextTaskId,
        taskDescription: text
    };
}