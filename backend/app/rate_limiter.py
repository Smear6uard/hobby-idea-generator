from collections import defaultdict, deque
from time import time


class InMemoryRateLimiter:
    def __init__(self, max_requests_per_minute: int) -> None:
        self.max_requests_per_minute = max_requests_per_minute
        self._requests: dict[str, deque[float]] = defaultdict(deque)

    def allow(self, client_id: str) -> bool:
        now = time()
        window_start = now - 60
        timestamps = self._requests[client_id]
        while timestamps and timestamps[0] < window_start:
            timestamps.popleft()

        if len(timestamps) >= self.max_requests_per_minute:
            return False

        timestamps.append(now)
        return True
