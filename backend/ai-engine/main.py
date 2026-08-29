from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Worker(BaseModel):
    worker_id: str
    skill_rating: float  # e.g., 0.8 to 1.2 efficiency multiplier

class Operation(BaseModel):
    operation_id: str
    sam: float  # Standard Allowed Minutes

class LineBalanceRequest(BaseModel):
    line_id: str
    workers: List[Worker]
    operations: List[Operation]

@app.post("/api/balance-line")
def balance_line(data: LineBalanceRequest):
    # Basic greedy allocation logic matching workers to operations based on skill
    sorted_workers = sorted(data.workers, key=lambda w: w.skill_rating, reverse=True)
    sorted_ops = sorted(data.operations, key=lambda o: o.sam, reverse=True)
    
    allocation = []
    for i, op in enumerate(sorted_ops):
        assigned_worker = sorted_workers[i % len(sorted_workers)]
        allocation.append({
            "operation_id": op.operation_id,
            "assigned_worker": assigned_worker.worker_id,
            "target_sam": op.sam
        })
        
    return {"line_id": data.line_id, "optimized_allocation": allocation}