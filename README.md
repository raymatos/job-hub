# job-manager
Distributed Job Manager for node using a datastore for persistence, modeled after quartz scheduler

## Tables 
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

## Jobs Data object - 
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
  stateful: false, bool
  excute: fn(data,log) //function to excute log is a function that takes a string, that string will be record in the DB as job data.
}
```

## States used in quartz
WAITING = the normal state of a trigger, waiting for its fire time to arrive and be acquired for firing by a scheduler.

PAUSED = means that one of the scheduler.pauseXXX() methods was used. The trigger is not eligible for being fired until it is resumed.

ACQUIRED = a scheduler node has identified this trigger as the next trigger it will fire - may still be waiting for its fire time to arrive. After it fires the trigger will be updated (per its repeat settings, if any) and placed back into the WAITING state (or be deleted if it does not repeat again).

BLOCKED = the trigger is prevented from being fired because it relates to a StatefulJob that is already executing. When the statefuljob completes its execution, all triggers relating to that job will return to the WAITING state.

## Job Type
  Stateless(default) - jobs are run normally with no states
  Stateful - Job's excute method will be passed the last jobs data, on first run the data will be null, users will have to pass the job data into the log method.  
  IE:
  ```
    excute: (data, log) => { 
      console.log(`this job has ran ${data} times`);
      log(data+1)
    }
  ```

## Triggers (when to run the job)
  Cron - Job will run according to the cron string, within the start and end dates if provided and max count if provided
  Event - Using the node EventEmitter it will listen for an event for the job to start.
  Manually - you can also invoke the job right away by calling ```hub().job("name").trigger()```
  
  IE: 
  ```
  cron: "*/5 * * * *"
  // run every 5 mins
  
  cron: "*/5 * * * *",
  count: 10
  // run every 5 mins up to 10 times
  
  let today = new Date();
  let tomorrow = today.setDate(tomorrow.getDate() + 1);
  
  cron: "*/5 * * * *",
  startTime: today,
  endTime: tomorrow
  //run every 5 mins starting today and ending tomorrow
  
  cron: "*/5 * * * *",
  startTime: tomorrow
  //run every 5 mins starting tomorrow
  
  event: "someEventName"
  //run after someEventName is called
  
  event: "someEventName"
  startTime: today,
  endTime: tomorrow
  //run after someEventName is called, but the current time is within today and tomorrow.
  
  ```

