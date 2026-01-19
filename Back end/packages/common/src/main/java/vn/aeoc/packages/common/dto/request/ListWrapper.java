package vn.aeoc.packages.common.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class ListWrapper<T> {
    private List<T> ids;
}
