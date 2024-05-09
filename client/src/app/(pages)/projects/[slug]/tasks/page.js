"use client"
import AdminLayout from '@/app/components/adminLayout/page'
import { Button} from '@nextui-org/react'
import React, {useState } from 'react'
import { ReactSortable } from "react-sortablejs";

  const sortableOptions = {
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: "ghost",
    group: "shared",
    forceFallback: true
  };

  function Container({ sprintListItem, sprintIndex, setSprintLists }) {
    return (
      <>
        <ReactSortable
          key={sprintListItem.id}
          list={sprintListItem.tasks}
          setList={(currentList) => {
            setSprintLists((sourceList) => {
              const tempList = [...sourceList];
              const _sprintIndex = [...sprintIndex];
              const lastIndex = _sprintIndex.pop();
              const lastArr = _sprintIndex.reduce(
                (arr, i) => arr[i]["children"],
                tempList
              );
              console.log(lastIndex);
              lastArr[lastIndex]["children"] = currentList;
              return tempList;
            });
          }}
          {...sortableOptions}
        >
          {sprintListItem.children &&
            sprintListItem.children.map((taskItem, taskId) => {
              return (
                <BlockWrapper
                  key={taskId}
                  sprintListItem={taskItem}
                  sprintIndex={[...sprintIndex, taskId]}
                  setSprintLists={setSprintLists}
                />
              );
            })}
        </ReactSortable>
      </>
    );
  }
  function BlockWrapper({ sprintListItem, sprintIndex, setSprintLists }) {
    if (!sprintListItem) return null;
    if (sprintListItem.type === "container") {
      return (
        <div className="flex flex-col gap-y-3 bg-red-500 p-4 my-3">
          {sprintListItem.sprintTitle}
          <Container
            sprintListItem={sprintListItem}
            setSprintLists={setSprintLists}
            sprintIndex={sprintIndex}
          />
        </div>
      );
    } else {
      return (
        <div className="block bg-green-600 ms-4 p-2">
          {sprintListItem.taskTitle}
        </div>
      );
    }
  }
  const Tasks = () => {
    const [sprintLists, setSprintLists] = useState([
      {
        id: 1,
        sprintTitle: "Yojana 1",
        parent_id: null,
        type: "container",
        tasks: [
          {
            id: 1,
            taskTitle: "Register Page",
            width: 3,
            type: "text",
            parent_id: 1
          },
          {
            id: 2,
            taskTitle: "Login Page",
            width: 3,
            type: "text",
            parent_id: 1
          }
        ]
      },
      {
        id: 2,
        sprintTitle: "Yojana 2",
        parent_id: null,
        type: "container",
        tasks: [
          {
            id: 3,
            taskTitle: "Change Password",
            width: 3,
            type: "text",
            parent_id: 2
          },
          {
            id: 4,
            taskTitle: "Auth Login",
            width: 3,
            type: "text",
            parent_id: 2
          }
        ]
      },
    ]);

    return (
      <div className='w-full'>
        <AdminLayout>
        <div className='flex flex-col items-end gap-5 p-5 h-full'>
          <Button>Create sprint</Button>
        </div>
        <ReactSortable list={sprintLists} setList={setSprintLists} {...sortableOptions}>
          {sprintLists.map((sprintListItem, sprintListId) => (
            <BlockWrapper
            sprintListId={sprintListId}
            sprintListItem={sprintListItem}
              sprintIndex={[sprintListId]}
              setSprintLists={setSprintLists}
            />
          ))}
        </ReactSortable>
        </AdminLayout>
      </div>
    );
  }
 

export default Tasks
