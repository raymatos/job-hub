# job-manager
Distributed Job Manager for node using a datastore for persistence, modeled after quartz scheduler

Jobs - 
```
{
  name: "Some Job", //String
  description: "Some Description", //String
  trigger: {
    cron: "* * * * 5" cron string
    timezone: "UTC" //String default to UTC
    event: "" //string event name??? 
    startTime: "" Datetime
    endTime: "" Datetime
    count: number //now many times to trigger it default infinity
  },
  excute: fn(log) //function to excute log is a function that takes a string, that string will be record in the DB as job data.
}
```

Tables 
```
Jobs
  name: String
  description: String
  trigger_type: enum(cron,event)
  timezone: timezone
  cron: String
  event: String
  next_fire_time: Datatime
  prev_fire_time: Datetime
  state: enum(waiting,paused,acquried,blocked)
  job_date: Text 
  
Schedulers 
  instance_name: string // hostname
  last_checkin_time: Datetime
  checkin_interval: int
```

States used in quartz
WAITING = the normal state of a trigger, waiting for its fire time to arrive and be acquired for firing by a scheduler.

PAUSED = means that one of the scheduler.pauseXXX() methods was used. The trigger is not eligible for being fired until it is resumed.

ACQUIRED = a scheduler node has identified this trigger as the next trigger it will fire - may still be waiting for its fire time to arrive. After it fires the trigger will be updated (per its repeat settings, if any) and placed back into the WAITING state (or be deleted if it does not repeat again).

BLOCKED = the trigger is prevented from being fired because it relates to a StatefulJob that is already executing. When the statefuljob completes its execution, all triggers relating to that job will return to the WAITING state.


