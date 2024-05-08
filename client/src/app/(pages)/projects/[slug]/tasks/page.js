"use client"
import AdminLayout from '@/app/components/adminLayout/page'
import { Button, Input } from '@nextui-org/react'
import React, { useEffect, useRef, useState } from 'react'
import { ReactSortable } from "react-sortablejs";

const Tasks = () => {
  const inputField = useRef(null);
  const [sprintList, setSprintList] = useState([])
  const [issueList, setIssueList] = useState([])
  const [activeForm, setActiveForm] = useState([])

  const handleSprint = () => {
    const existingSprintList = [...sprintList]
    const sprintDetails = { sprintName: 'Yojana ' + (sprintList.length + 1) }
    existingSprintList.push(sprintDetails)
    setSprintList(existingSprintList)
  }

  const handleActiveForm = (index) => {
    setActiveForm(index)
  }

  useEffect(() => {
    document.body.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        setIssueList(prevState => {
          if (!prevState.includes(inputField.current.value)) {
            return ([...prevState, { id: prevState.length + 1, issueName: inputField.current.value }])
          } else return [...prevState]
        })
      }
    })
  }, [])

  const sortableOptions = {
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: "ghost",
    group: "shared",
    forceFallback: true
  };
  const SudeepSort = () => {
    const [blocks, setBlocks] = useState([
      {
        id: 1,
        content: "item 1",
        parent_id: null,
        type: "container",
        children: [
          {
            id: 2,
            content: "item 2",
            width: 3,
            type: "text",
            parent_id: 1
          },
          {
            id: 3,
            content: "item 3",
            width: 3,
            type: "text",
            parent_id: 1
          }
        ]
      },
      {
        id: 4,
        content: "item 2",
        parent_id: null,
        type: "container",
        children: [
          {
            id: 5,
            content: "item 5",
            width: 3,
            parent_id: 2,
            type: "container",
            children: [
              { id: 8, content: "item 8", width: 6, type: "text", parent_id: 5 },
              { id: 9, content: "item 9", width: 6, type: "text", parent_id: 5 }
            ]
          },
          {
            id: 6,
            content: "item 6",
            width: 2,
            type: "text",
            parent_id: 2
          },
          {
            id: 7,
            content: "item 7",
            width: 2,
            type: "text",
            parent_id: 2
          }
        ]
      }
    ]);

    return (
      <div>
        <ReactSortable list={blocks} setList={setBlocks} {...sortableOptions}>
          {blocks.map((block, blockIndex) => (
            <BlockWrapper
              key={block.id}
              block={block}
              blockIndex={[blockIndex]}
              setBlocks={setBlocks}
            />
          ))}
        </ReactSortable>
      </div>
    );
  }
  function Container({ block, blockIndex, setBlocks }) {
    return (
      <>
        <ReactSortable
          key={block.id}
          list={block.children}
          setList={(currentList) => {
            setBlocks((sourceList) => {
              const tempList = [...sourceList];
              const _blockIndex = [...blockIndex];
              const lastIndex = _blockIndex.pop();
              const lastArr = _blockIndex.reduce(
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
          {block.children &&
            block.children.map((childBlock, index) => {
              return (
                <BlockWrapper
                  key={childBlock.id}
                  block={childBlock}
                  blockIndex={[...blockIndex, index]}
                  setBlocks={setBlocks}
                />
              );
            })}
        </ReactSortable>
      </>
    );
  }
  function BlockWrapper({ block, blockIndex, setBlocks }) {
    // console.log(block);
    if (!block) return null;
    if (block.type === "container") {
      return (
        <div className="block">
          container: {block.content}
          <Container
            block={block}
            setBlocks={setBlocks}
            blockIndex={blockIndex}
          />
        </div>
      );
    } else {
      return (
        <div className="block">
          text: {block.content}
        </div>
      );
    }
  }

  return (
    <>
      <AdminLayout>
        {JSON.stringify(issueList)}
        <div className='flex flex-col items-end gap-5 p-5 h-full'>
          <Button onClick={handleSprint}>Create sprint</Button>
          <SudeepSort />
        </div>
      </AdminLayout>
    </>
  )
}

export default Tasks
