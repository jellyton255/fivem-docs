					<Virtuoso
						style={{ width: "95%", height: listHeight }}
						data={filteredNatives}
						itemContent={(index, [nativeHash, nativeData]) => (
							<NativeNavLink key={nativeHash} nativeHash={nativeHash} nativeData={nativeData} formattedCategoryName={formattedCategoryName} location={location} />
						)}
					/>
